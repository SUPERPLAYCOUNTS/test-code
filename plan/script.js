document.addEventListener('DOMContentLoaded', function() {
    const PIXELS_PER_MINUTE = 1.5;
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
        let currentLesson = null;
        let nextLesson = null;

        for (const lesson of allLessonsToday) {
            if (currentMinutes >= lesson.startMinutes && currentMinutes < lesson.endMinutes) {
                currentLesson = lesson;
                break;
            }
            if (currentMinutes < lesson.startMinutes && !nextLesson) {
                nextLesson = lesson;
            }
        }

        if (currentLesson) {
            message = `Teraz lekcja: <strong>${currentLesson.subject}</strong> (${currentLesson.startTime} - ${currentLesson.endTime}). Sala: <strong>${currentLesson.room}</strong>.`;
        } else if (nextLesson) {
            const previousLesson = allLessonsToday.slice().reverse().find(l => l.endMinutes <= currentMinutes);
            if (previousLesson) {
                 message = `Teraz przerwa. Następna lekcja: <strong>${nextLesson.subject}</strong> o ${nextLesson.startTime}.`;
            } else {
                 message = `Lekcje jeszcze się nie zaczęły. Pierwsza lekcja: <strong>${nextLesson.subject}</strong> o ${nextLesson.startTime}.`;
            }
        } else if (allLessonsToday.length > 0) {
            message = "Koniec lekcji na dziś.";
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
        highlightCurrentDay();
        
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
        data.days.forEach(day => {
            totalColumns += day.columns.length;
        });

        headerArea.style.gridTemplateColumns = `repeat(${totalColumns}, 1fr)`;
        scheduleArea.style.gridTemplateColumns = `repeat(${totalColumns}, 1fr)`;
        scheduleArea.style.height = (END_HOUR - START_HOUR) * 60 * PIXELS_PER_MINUTE + 'px';
    }

    function buildTimeColumn() {
        for (let hour = START_HOUR; hour < END_HOUR; hour++) {
            const timeSlot = document.createElement('div');
            timeSlot.className = 'time-slot';
            timeSlot.textContent = `${String(hour).padStart(2, '0')}:00`;
            timeSlot.style.height = (60 * PIXELS_PER_MINUTE) + 'px';
            timeColumn.appendChild(timeSlot);
        }
    }

    function buildSchedule(data) {
        data.days.forEach(day => {
            const dayHeader = document.createElement('div');
            dayHeader.className = 'day-header';
            dayHeader.textContent = day.name;
            dayHeader.style.gridColumn = `span ${day.columns.length}`;
            headerArea.appendChild(dayHeader);

            day.columns.forEach(columnData => {
                const dayColumn = document.createElement('div');
                dayColumn.className = 'day-column';
                
                const lessons = columnData.lessons.map(l => ({
                    ...l,
                    start: timeToMinutes(l.startTime),
                    end: timeToMinutes(l.endTime)
                })).sort((a, b) => a.start - b.start || (b.end - b.start) - (a.end - a.start));

                const layout = calculateLayout(lessons);

                layout.forEach(item => {
                    const lessonElement = createLessonElement(item.lesson);
                    lessonElement.style.top = `${(item.lesson.start - (START_HOUR * 60)) * PIXELS_PER_MINUTE}px`;
                    lessonElement.style.height = `${(item.lesson.end - item.lesson.start) * PIXELS_PER_MINUTE - 2}px`;
                    lessonElement.style.left = `${item.subColumnIndex * (100 / item.totalSubColumns)}%`;
                    lessonElement.style.width = `calc(${100 / item.totalSubColumns}% - 4px)`;
                    dayColumn.appendChild(lessonElement);
                });
                scheduleArea.appendChild(dayColumn);
            });
        });
    }

    function calculateLayout(lessons) {
        const layout = [];
        let i = 0;
        while (i < lessons.length) {
            const overlappingGroup = findOverlappingGroup(lessons, i);
            processGroup(overlappingGroup, layout);
            i += overlappingGroup.length;
        }
        return layout;
    }

    function findOverlappingGroup(lessons, startIndex) {
        const group = [lessons[startIndex]];
        let maxEndTime = lessons[startIndex].end;
        for (let i = startIndex + 1; i < lessons.length; i++) {
            if (lessons[i].start < maxEndTime) {
                group.push(lessons[i]);
                maxEndTime = Math.max(maxEndTime, lessons[i].end);
            } else {
                break;
            }
        }
        return group;
    }

    function processGroup(group, layout) {
        const subColumns = [];
        group.forEach(lesson => {
            let placed = false;
            for (let i = 0; i < subColumns.length; i++) {
                if (lesson.start >= subColumns[i]) {
                    layout.push({ lesson, subColumnIndex: i, totalSubColumns: 0 });
                    subColumns[i] = lesson.end;
                    placed = true;
                    break;
                }
            }
            if (!placed) {
                layout.push({ lesson, subColumnIndex: subColumns.length, totalSubColumns: 0 });
                subColumns.push(lesson.end);
            }
        });
        const totalSubColumns = subColumns.length;
        layout.slice(-group.length).forEach(item => item.totalSubColumns = totalSubColumns);
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
        const topPosition = (currentMinutes - (START_HOUR * 60)) * PIXELS_PER_MINUTE;
        const currentTimeString = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

        if (topPosition >= 0 && topPosition <= (END_HOUR - START_HOUR) * 60 * PIXELS_PER_MINUTE) {
            indicator.style.display = 'block';
            indicator.style.top = `${topPosition}px`;
            indicator.style.setProperty('--time-indicator-text', `"${currentTimeString}"`);
        } else {
            indicator.style.display = 'none';
        }
    }

    function highlightCurrentDay() {
        const daysOfWeek = ["Niedziela", "Poniedziałek", "Wtorek", "Środa", "Czwartek", "Piątek", "Sobota"];
        const today = new Date().getDay();
        const dayName = daysOfWeek[today];

        const dayHeaders = document.querySelectorAll('.day-header');
        dayHeaders.forEach(header => {
            if (header.textContent === dayName) {
                header.style.backgroundColor = 'var(--accent-color)';
                header.style.color = 'var(--current-day-text)';
                header.style.fontWeight = 'bold';
                const dayColumn = header.closest('.header-area').nextElementSibling.querySelector('.day-column');
                if (dayColumn) {
                    dayColumn.style.backgroundColor = 'var(--current-day-bg)';
                }
            }
        });
    }

    fetch('data.json')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            timetableData = data;
            renderTimetable(data);
        })
        .catch(error => {
            console.error("Error loading or parsing JSON data:", error);
            scheduleArea.innerHTML = `<p style="text-align:center; color:red; grid-column: 1 / -1;">Nie udało się załadować planu lekcji.</p>`;
        });

    printButton.addEventListener('click', () => {
        window.print();
    });
});
