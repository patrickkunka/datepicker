/* eslint-disable max-len */

import  Util from './Util';

const Templates = {};

Templates.day    = Util.template('<td class="${className}" data-ref="day" data-month="${monthNumber}" data-day="${dayNumber}">${dayNumber}</td>');
Templates.marker = Util.template('<th class="${className}">${dayShortName}</th>');
Templates.week   = Util.template('<tr class="${className}">${daysHtml}</tr>');

Templates.container = Util.template(
    '<div class="${containerClassName}">' +
        '<header data-ref="header" class="${headerClassName}">' +
            '<span class="${buttonGroupClassName}">' +
                '<button class="${buttonPrevYearClassName}" type="button" data-ref="button" data-action="GO_TO_PREV_YEAR"></button> ' +
                '<button class="${buttonPrevMonthClassName}" type="button" data-ref="button" data-action="GO_TO_PREV_MONTH"></button> ' +
            '</span> ' +
            '<span class="${headingClassName}">${monthName} ${year}</span> ' +
            '<span class="${buttonGroupClassName}">' +
                '<button class="${buttonNextMonthClassName}" type="button" data-ref="button" data-action="GO_TO_NEXT_MONTH"></button> ' +
                '<button class="${buttonNextYearClassName}" type="button" data-ref="button" data-action="GO_TO_NEXT_YEAR"></button>' +
            '</span>' +
        '</header>' +
        '<div class="${calendarClassName}" data-ref="calendar">' +
            '<table class="${monthClassName}" data-ref="month">' +
                '<thead>' +
                    '<tr>${legendHtml}</tr>' +
                '</thead>' +
                '<tbody data-ref="tbody">${weeksHtml}</tbody>' +
            '</table>' +
        '</div>' +
    '</div>'
);

export default Object.freeze(Templates);