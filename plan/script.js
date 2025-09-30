document.addEventListener('DOMContentLoaded', function() {
    const PIXELS_PER_MINUTE = 1.4;
    const timeColumn = document.getElementById('time-column');
    const scheduleArea = document.getElementById('schedule-area');
    const headerArea = document.getElementById('header-area');
    const printButton = document.getElementById('printButton');
    const currentLessonInfoContainer = document.getElementById('current-lesson-info');
    
    let timetableData = null;
    let START_HOUR = 7;
    let END_HOUR = 21;

    const subjectColors = {};
    const colorPalette = [
        '#ef4444', '#f97316', '#eab308', '#84cc16', '#22c55e', '#14b8a6',
        '#06b6d4', '#3b82f6', '#8b5cf6', '#d946ef', '#ec4899', '#78716c'
    ];
    let colorIndex = 0;

    function getSubjectColor(subject) {
        const baseSubject = subject.split('|')[0].trim();
        if (!subjectColors[baseSubject]) {
            subjectColors[baseSubject] = colorPalette[colorIndex % colorPalette.length];
            colorIndex++;
        }
        return subjectColors[baseSubject];
    }

    function timeToMinutes(timeStr) {
        if (!timeStr) return 0;
        const [hours, minutes] = timeStr.split(':').map(Number);
        return (hours * 60) + minutes;
    }

    function updateCurrentLessonInfo() {
        if (!timetableData) return;
        const now = new Date();
        const daysOfWeek = ["Niedziela", "Poniedziałek", "Wtorek", "Środa", "Czwartek", "Piątek", "Sobota"];
        const todayName = daysOfWeek[now.getDay()];
        const currentMinutes = now.getHours() * 60 + now.getMinutes();
        const todayData = timetableData.days.find(day => day.name === todayName);

        if (!todayData) {
            currentLessonInfoContainer.style.display = 'none';
            return;
        }

        const allLessonsToday = [];
        todayData.columns.forEach(col => {
            col.lessons.forEach(lesson => {
                allLessonsToday.push({
                    ...lesson,
                    startMinutes: timeToMinutes(lesson.startTime),
                    endMinutes: timeToMinutes(lesson.endTime)
                });
            });
        });
        allLessonsToday.sort((a, b) => a.startMinutes - b.startMinutes);

        let message = "";
        const currentLesson = allLessonsToday.find(l => currentMinutes >= l.startMinutes && currentMinutes < l.endMinutes);
        const nextLesson = allLessonsToday.find(l => l.startMinutes > currentMinutes);

        if (currentLesson) {
            message = `Teraz: <strong>${currentLesson.subject}</strong> (${currentLesson.startTime} - ${currentLesson.endTime}) w sali <strong>${currentLesson.room}</strong>.`;
        } else if (nextLesson) {
            message = `Następna lekcja: <strong>${nextLesson.subject}</strong> o ${nextLesson.startTime}.`;
        } else if (allLessonsToday.length > 0 && currentMinutes > allLessonsToday[allLessonsToday.length - 1].endMinutes) {
            message = "Lekcje na dziś się zakończyły.";
        }

        if (message) {
            currentLessonInfoContainer.innerHTML = message;
            currentLessonInfoContainer.style.display = 'block';
        } else {
            currentLessonInfoContainer.style.display = 'none';
        }
    }

    function renderTimetable(data) {
        calculateTimeRange(data);
        setupGrid(data);
        buildTimeColumn();
        buildSchedule(data);
        highlightCurrentDay(data);
        updateTimeIndicator();
        updateCurrentLessonInfo();
        setInterval(() => {
            updateTimeIndicator();
            updateCurrentLessonInfo();
        }, 60000);
    }
    
    function calculateTimeRange(data) {
        let minTime = 24 * 60;
        let maxTime = 0;
        data.days.forEach(day => {
            day.columns.forEach(col => {
                col.lessons.forEach(lesson => {
                    minTime = Math.min(minTime, timeToMinutes(lesson.startTime));
                    maxTime = Math.max(maxTime, timeToMinutes(lesson.endTime));
                });
            });
        });
        START_HOUR = Math.floor(minTime / 60);
        END_HOUR = Math.ceil(maxTime / 60);
    }

    function setupGrid(data) {
        let totalColumns = 0;
        data.days.forEach(day => totalColumns += day.columns.length);

        headerArea.style.gridTemplateColumns = `repeat(${totalColumns}, 1fr)`;
        scheduleArea.style.gridTemplateColumns = `repeat(${totalColumns}, 1fr)`;
        
        const totalMinutes = (END_HOUR - START_HOUR) * 60;
        scheduleArea.style.height = `${totalMinutes * PIXELS_PER_MINUTE}px`;
        scheduleArea.style.backgroundSize = `100% ${60 * PIXELS_PER_MINUTE}px`;
    }

    function buildTimeColumn() {
        timeColumn.innerHTML = '';
        for (let hour = START_HOUR; hour <= END_HOUR; hour++) {
            const timeSlot = document.createElement('div');
            timeSlot.className = 'time-slot';
            timeSlot.textContent = `${String(hour).padStart(2, '0')}:00`;
            const topPosition = (hour - START_HOUR) * 60 * PIXELS_PER_MINUTE;
            timeSlot.style.top = `${topPosition}px`;
            timeColumn.appendChild(timeSlot);
        }
    }

    function buildSchedule(data) {
        headerArea.innerHTML = '';
        scheduleArea.innerHTML = '';
        let gridColumnIndex = 1;

        data.days.forEach(day => {
            const dayHeader = document.createElement('div');
            dayHeader.className = 'day-header';
            dayHeader.textContent = day.name;
            dayHeader.style.gridColumn = `span ${day.columns.length}`;
            headerArea.appendChild(dayHeader);

            day.columns.forEach(() => {
                const dayColumn = document.createElement('div');
                dayColumn.className = 'day-column';
                scheduleArea.appendChild(dayColumn);
            });
        });

        let dayColumnElements = scheduleArea.querySelectorAll('.day-column');
        let currentDayColumnIndex = 0;

        data.days.forEach(day => {
            day.columns.forEach(columnData => {
                const dayColumn = dayColumnElements[currentDayColumnIndex];
                if (!dayColumn) return;

                const lessons = columnData.lessons.map(l => ({
                    ...l,
                    start: timeToMinutes(l.startTime),
                    end: timeToMinutes(l.endTime)
                })).sort((a, b) => a.start - b.start);

                lessons.forEach(lesson => {
                    const lessonElement = createLessonElement(lesson);
                    const top = (lesson.start - START_HOUR * 60) * PIXELS_PER_MINUTE;
                    const height = (lesson.end - lesson.start) * PIXELS_PER_MINUTE - 2;
                    
                    lessonElement.style.top = `${top}px`;
                    lessonElement.style.height = `${height}px`;
                    lessonElement.style.left = '4px';
                    lessonElement.style.width = 'calc(100% - 8px)';

                    dayColumn.appendChild(lessonElement);
                });
                currentDayColumnIndex++;
            });
        });
    }

    function createLessonElement(lesson) {
        const element = document.createElement('div');
        element.className = 'lesson';
        element.style.borderLeftColor = getSubjectColor(lesson.subject);
        element.innerHTML = `
            <div class="lesson-time">${lesson.startTime} - ${lesson.endTime}</div>
            <div class="lesson-subject">${lesson.subject}</div>
            <div class="lesson-room">${lesson.room}</div>
        `;
        return element;
    }

    function updateTimeIndicator() {
        let indicator = document.getElementById('time-indicator');
        if (!indicator) {
            indicator = document.createElement('div');
            indicator.id = 'time-indicator';
            indicator.className = 'time-indicator';
            scheduleArea.appendChild(indicator);
        }

        const now = new Date();
        const currentMinutes = now.getHours() * 60 + now.getMinutes();
        const topPosition = (currentMinutes - START_HOUR * 60) * PIXELS_PER_MINUTE;
        const currentTimeString = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

        if (topPosition >= 0 && topPosition <= (END_HOUR - START_HOUR) * 60 * PIXELS_PER_MINUTE) {
            indicator.style.display = 'block';
            indicator.style.top = `${topPosition}px`;
            indicator.style.setProperty('--time-indicator-text', `"${currentTimeString}"`);
        } else {
            indicator.style.display = 'none';
        }
    }

    function highlightCurrentDay(data) {
        const daysOfWeek = ["Niedziela", "Poniedziałek", "Wtorek", "Środa", "Czwartek", "Piątek", "Sobota"];
        const todayName = daysOfWeek[new Date().getDay()];
        
        const dayHeaders = headerArea.querySelectorAll('.day-header');
        const dayColumns = scheduleArea.querySelectorAll('.day-column');
        let currentColumnIndex = 0;

        data.days.forEach((day, index) => {
            const header = dayHeaders[index];
            const isToday = day.name === todayName;

            if (isToday && header) {
                header.style.backgroundColor = 'var(--accent-color)';
                header.style.color = 'var(--current-day-text)';
            }

            for (let i = 0; i < day.columns.length; i++) {
                const column = dayColumns[currentColumnIndex];
                if (isToday && column) {
                    column.style.backgroundColor = 'var(--current-day-bg)';
                }
                currentColumnIndex++;
            }
        });
    }

    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            timetableData = data;
            renderTimetable(data);
        })
        .catch(error => {
            console.error("Błąd ładowania planu lekcji:", error);
            scheduleArea.innerHTML = `<p style="text-align:center; color:red; grid-column: 1 / -1;">Nie udało się załadować planu lekcji.</p>`;
        });

    printButton.addEventListener('click', () => window.print());
});
