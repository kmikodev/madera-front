import React, { useState } from 'react';
import { format, subDays, subMonths, subYears, startOfMonth, endOfMonth, 
         startOfQuarter, endOfQuarter, startOfYear, endOfYear } from 'date-fns';
import { useTranslation } from 'react-i18next';

interface DateRange {
  startDate: Date;
  endDate: Date;
  label: string;
}

interface DateRangeFilterProps {
  onDateRangeChange: (startDate: string, endDate: string) => void;
}

const DateRangeFilter: React.FC<DateRangeFilterProps> = ({ onDateRangeChange }) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [activeRange, setActiveRange] = useState<string>('thisMonth');
  const [customStartDate, setCustomStartDate] = useState<string>(
    format(new Date(), 'yyyy-MM-dd')
  );
  const [customEndDate, setCustomEndDate] = useState<string>(
    format(new Date(), 'yyyy-MM-dd')
  );

  // Predefined date ranges
  const ranges: Record<string, DateRange> = {
    today: {
      startDate: new Date(),
      endDate: new Date(),
      label: t('dateFilter.today')
    },
    yesterday: {
      startDate: subDays(new Date(), 1),
      endDate: subDays(new Date(), 1),
      label: t('dateFilter.yesterday')
    },
    last7Days: {
      startDate: subDays(new Date(), 6),
      endDate: new Date(),
      label: t('dateFilter.last7Days')
    },
    last30Days: {
      startDate: subDays(new Date(), 29),
      endDate: new Date(),
      label: t('dateFilter.last30Days')
    },
    thisMonth: {
      startDate: startOfMonth(new Date()),
      endDate: endOfMonth(new Date()),
      label: t('dateFilter.thisMonth')
    },
    lastMonth: {
      startDate: startOfMonth(subMonths(new Date(), 1)),
      endDate: endOfMonth(subMonths(new Date(), 1)),
      label: t('dateFilter.lastMonth')
    },
    thisQuarter: {
      startDate: startOfQuarter(new Date()),
      endDate: endOfQuarter(new Date()),
      label: t('dateFilter.thisQuarter')
    },
    lastQuarter: {
      startDate: startOfQuarter(subMonths(new Date(), 3)),
      endDate: endOfQuarter(subMonths(new Date(), 3)),
      label: t('dateFilter.lastQuarter')
    },
    thisYear: {
      startDate: startOfYear(new Date()),
      endDate: endOfYear(new Date()),
      label: t('dateFilter.thisYear')
    },
    lastYear: {
      startDate: startOfYear(subYears(new Date(), 1)),
      endDate: endOfYear(subYears(new Date(), 1)),
      label: t('dateFilter.lastYear')
    }
  };

  // Apply selected predefined range
  const applyPredefinedRange = (rangeKey: string) => {
    const range = ranges[rangeKey];
    if (range) {
      setActiveRange(rangeKey);
      onDateRangeChange(
        format(range.startDate, 'yyyy-MM-dd'),
        format(range.endDate, 'yyyy-MM-dd')
      );
      setIsOpen(false);
    }
  };

  // Apply custom date range
  const applyCustomRange = () => {
    setActiveRange('custom');
    onDateRangeChange(customStartDate, customEndDate);
    setIsOpen(false);
  };

  // Format the currently selected range for display
  const formatCurrentRange = () => {
    if (activeRange === 'custom') {
      return `${format(new Date(customStartDate), 'dd/MM/yyyy')} - ${format(
        new Date(customEndDate),
        'dd/MM/yyyy'
      )}`;
    }

    const range = ranges[activeRange];
    if (range) {
      return `${format(range.startDate, 'dd/MM/yyyy')} - ${format(
        range.endDate,
        'dd/MM/yyyy'
      )}`;
    }

    return t('dateFilter.selectRange');
  };

  return (
    <div className="relative">
      <button
        className="flex items-center justify-between w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="flex items-center">
          <i className="fas fa-calendar-alt mr-2"></i>
          {formatCurrentRange()}
        </span>
        <i className={`fas fa-chevron-${isOpen ? 'up' : 'down'} ml-2`}></i>
      </button>

      {isOpen && (
        <div className="absolute z-10 w-full md:w-96 mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
          <div className="p-3 border-b border-gray-200">
            <h3 className="text-lg font-medium">{t('dateFilter.selectPeriod')}</h3>
          </div>

          <div className="p-3 grid grid-cols-2 gap-2">
            {Object.entries(ranges).map(([key, range]) => (
              <button
                key={key}
                className={`px-3 py-2 text-sm rounded-md ${
                  activeRange === key
                    ? 'bg-primary-100 text-primary-800'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
                onClick={() => applyPredefinedRange(key)}
              >
                {range.label}
              </button>
            ))}
          </div>

          <div className="p-3 border-t border-gray-200">
            <h4 className="text-sm font-medium mb-2">{t('dateFilter.customRange')}</h4>
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="flex flex-col">
                <label htmlFor="start-date" className="text-xs text-gray-500">
                  {t('dateFilter.startDate')}
                </label>
                <input
                  id="start-date"
                  type="date"
                  className="px-2 py-1 border border-gray-300 rounded-md"
                  value={customStartDate}
                  onChange={(e) => setCustomStartDate(e.target.value)}
                  max={customEndDate}
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="end-date" className="text-xs text-gray-500">
                  {t('dateFilter.endDate')}
                </label>
                <input
                  id="end-date"
                  type="date"
                  className="px-2 py-1 border border-gray-300 rounded-md"
                  value={customEndDate}
                  onChange={(e) => setCustomEndDate(e.target.value)}
                  min={customStartDate}
                />
              </div>
              <button
                className="mt-auto px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700"
                onClick={applyCustomRange}
              >
                {t('dateFilter.apply')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DateRangeFilter;