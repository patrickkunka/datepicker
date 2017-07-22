/* eslint-disable max-len */

export const day    = day => `<td class="${day.className}" data-ref="day" data-month="${day.monthNumber}" data-day="${day.dayNumber}">${day.dayNumber}</td>`;
export const marker = marker => `<th class="${marker.className}">${marker.dayShortName}</th>`;
export const week   = week => `<tr class="${week.className}">${week.daysHtml}</tr>`;
export const button = button => `<button class="${button.className}" type="button" data-ref="button" data-action="${button.actionType}"></button>`;

export const container = month => (
    `<div class="${month.containerClassName}">
        <header data-ref="header" class="${month.headerClassName}">
            <span class="${month.buttonGroupClassName}">
                ${month.buttonPrevYearHtml}
                ${month.buttonPrevMonthHtml}
            </span>
            <span class="${month.headingClassName}">${month.monthName} ${month.year}</span>
            <span class="${month.buttonGroupClassName}">
                ${month.buttonNextMonthHtml}
                ${month.buttonNextYearHtml}
            </span>
        </header>
        <div class="${month.calendarClassName}" data-ref="calendar">
            <table class="${month.monthClassName}" data-ref="month">
                <thead data-ref="thead">
                    <tr>${month.legendHtml}</tr>
                </thead>
                <tbody data-ref="tbody">${month.weeksHtml}</tbody>
            </table>
        </div>
    </div>`
);