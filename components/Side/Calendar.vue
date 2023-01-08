<script lang="ts" setup>
import {ChevronLeftIcon, ChevronRightIcon} from '@heroicons/vue/20/solid/index'

const weeks: Week[] = [
  {
    isSelected: true,
    days: [
      {date: '2023-01-01', isCurrentMonth: true},
      {date: '2023-01-02', isCurrentMonth: true},
      {date: '2023-01-03', isCurrentMonth: true},
      {date: '2023-01-04', isCurrentMonth: true},
      {date: '2023-01-05', isCurrentMonth: true, isToday: true},
      {date: '2023-01-06', isCurrentMonth: true},
      {date: '2023-01-07', isCurrentMonth: true},
    ]
  },
  {
    days: [
      {date: '2023-01-08', isCurrentMonth: true},
      {date: '2023-01-09', isCurrentMonth: true},
      {date: '2023-01-10', isCurrentMonth: true},
      {date: '2023-01-11', isCurrentMonth: true},
      {date: '2023-01-12', isCurrentMonth: true},
      {date: '2023-01-13', isCurrentMonth: true},
      {date: '2023-01-14', isCurrentMonth: true},
    ],
  },
  {
    days: [
      {date: '2023-01-15', isCurrentMonth: true},
      {date: '2023-01-16', isCurrentMonth: true},
      {date: '2023-01-17', isCurrentMonth: true},
      {date: '2023-01-18', isCurrentMonth: true},
      {date: '2023-01-19', isCurrentMonth: true},
      {date: '2023-01-20', isCurrentMonth: true},
      {date: '2023-01-21', isCurrentMonth: true},
    ],
  },
  {
    days: [
      {date: '2023-01-22', isCurrentMonth: true},
      {date: '2023-01-23', isCurrentMonth: true},
      {date: '2023-01-24', isCurrentMonth: true},
      {date: '2023-01-25', isCurrentMonth: true},
      {date: '2023-01-26', isCurrentMonth: true},
      {date: '2023-01-27', isCurrentMonth: true},
      {date: '2023-01-28', isCurrentMonth: true},
    ],
  },
  {
    days: [
      {date: '2023-01-29', isCurrentMonth: true},
      {date: '2023-01-30', isCurrentMonth: true},
      {date: '2023-01-31', isCurrentMonth: true},
      {date: '2023-02-01'},
      {date: '2023-02-02'},
      {date: '2023-02-03'},
      {date: '2023-02-04'},
    ],
  },
]
</script>

<template>
  <div>
    <div class="rounded-md px-3.5 py-2">
      <div class="flex items-center">
        <h2 class="flex-auto font-semibold text-gray-700">Січень 2023</h2>
        <button class="-my-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500" type="button">
          <span class="sr-only">Минулий місяць</span>
          <ChevronLeftIcon aria-hidden="true" class="h-5 w-5" />
        </button>
        <button class="-my-1.5 -mr-1.5 ml-2 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500" type="button">
          <span class="sr-only">Наступний місяць</span>
          <ChevronRightIcon aria-hidden="true" class="h-5 w-5" />
        </button>
      </div>
      <div class="mt-10 -mx-2 grid grid-cols-7 text-center text-xs text-gray-700">
        <div>Нд</div>
        <div>Пн</div>
        <div>Вт</div>
        <div>Ср</div>
        <div>Чт</div>
        <div>Пт</div>
        <div>Сб</div>
      </div>
      <div class="mt-3 -mx-2 text-sm">
        <button v-for="week in weeks" :key="week.days[week.days.length - 1].date" class="w-full grid grid-cols-7 py-0.25 my-0.25 rounded-full" :class="[
          !week.isSelected && 'hover:bg-gray-100/80',
          week.isSelected && 'bg-gray-200/50',
        ]">
          <span v-for="day in week.days" :key="day.date">
            <span :class="[
              day.isCurrentMonth && day.isToday && 'text-green-600',
              week.isSelected && day.isCurrentMonth && !day.isToday && 'text-black',
              !week.isSelected && !day.isToday && day.isCurrentMonth && 'text-gray-900',
              !week.isSelected && !day.isToday && !day.isCurrentMonth && 'text-gray-400',
              (week.isSelected || day.isToday) && 'font-semibold',
            ]" class="mx-auto flex h-8 w-8 items-center justify-center rounded-full" type="button">
              <time :datetime="day.date">{{ day.date.split('-').pop().replace(/^0/, '') }}</time>
            </span>
          </span>
        </button>
      </div>
    </div>
  </div>
</template>
