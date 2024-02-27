import {
  TSemesterCodeMonthMapper,
  TSemesterNameCodeMapper,
} from './academicFaculty.interface'

export const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

export const semesterName = ['Autumn', 'Summar', 'Fall']
export const semesterCode = ['01', '02', '03']

export const semesterNameCodeMapper: TSemesterNameCodeMapper = {
  Autumn: '01',
  Summar: '02',
  Fall: '03',
}

export const semesterCodeMonthMapper: TSemesterCodeMonthMapper = {
  Autumn: {
    code: '01',
    startMonth: 'January',
    endMonth: 'April',
  },
  Summar: {
    code: '02',
    startMonth: 'May',
    endMonth: 'August',
  },
  Fall: {
    code: '03',
    startMonth: 'September',
    endMonth: 'December',
  },
}
