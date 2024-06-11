import React, { useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import * as Notifications from 'expo-notifications';
import { scheduleDateNotification, requestPermissions } from '../../utils/notifications'; // Import the functions from the notifications file

const academicData: AcademicData = require('../../scripts/academic2024.json');

interface PaymentDeadline {
  type: string;
  date: string;
}

interface Registration {
  start_date: string;
  end_date: string;
}

interface AdvisorsMeeting {
  date: string;
}

interface ClassesStart {
  date: string;
}

interface AddDropDeadline {
  date: string;
  type: string;
}

interface MidSemesterExam {
  start_date: string;
  end_date: string;
}

interface OralExam {
  start_date: string;
  end_date: string;
  programs: string[];
}

interface PreparatoryLeave {
  start_date: string;
  end_date: string;
}

interface FinalExam {
  start_date: string;
  end_date: string;
}

interface RepeatExamRegistration {
  start_date: string;
  end_date: string;
}

interface RepeatExam {
  start_date: string;
  end_date: string;
}

interface RegistrationNextSemester {
  start_date: string;
  end_date: string;
}

interface Semester {
  name: string;
  start_date: string;
  end_date: string;
  registration: Registration;
  advisors_meeting: AdvisorsMeeting;
  classes_start: ClassesStart;
  add_drop_deadline: AddDropDeadline;
  mid_semester_exam: MidSemesterExam;
  advisors_meeting_2: AdvisorsMeeting;
  advisors_meeting_3: AdvisorsMeeting;
  preparatory_leave: PreparatoryLeave;
  final_exam: FinalExam;
  oral_exam: OralExam;
  repeat_exam_registration: RepeatExamRegistration;
  repeat_exam: RepeatExam;
  registration_next_semester: RegistrationNextSemester;
  payment_deadlines: PaymentDeadline[];
}

interface Holiday {
  name: string;
  date?: string;
  start_date?: string;
  end_date?: string;
}

interface AcademicData {
  fields: {
    year: number;
    semesters: Semester[];
    holidays: Holiday[];
  }
}

const formatDate = (dateString: string): string => {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};


const Academic = () => {
  const { year, semesters, holidays } = academicData.fields;

  const [loaded] = useFonts({
    'Poppins-Regular': require('../../assets/fonts/Poppins-Regular.ttf'),
    'Poppins-medium': require('../../assets/fonts/Poppins-SemiBold.ttf'),
  });

  if (!loaded) {
    return null;
  }

  useEffect(() => {
    (async () => {
      // Request notification permissions
      const hasPermission = await requestPermissions();
      if (hasPermission) {
        semesters.forEach((semester: any) => {
          scheduleDateNotification(semester.start_date, `${semester.name} Starts`, `The ${semester.name} semester starts today.`);
          scheduleDateNotification(semester.end_date, `${semester.name} Ends`, `The ${semester.name} semester ending Soon.You Made it !!`);
          scheduleDateNotification(semester.registration.start_date, `${semester.name} Registration Starts`, `Registration for the ${semester.name} semester starts today.`);
          scheduleDateNotification(semester.registration.end_date, `${semester.name} Registration Ends`, `Registration for the ${semester.name} semester ending Soon.`);
          scheduleDateNotification(semester.advisors_meeting.date, `${semester.name} Advisors Meeting`, `The advisors meeting for the ${semester.name} semester is today.`);
          scheduleDateNotification(semester.classes_start.date, `${semester.name} Classes Start`, `Classes for the ${semester.name} semester starting Soon.`);
          scheduleDateNotification(semester.add_drop_deadline.date, `${semester.name} Add/Drop Deadline`, `The add/drop deadline for the ${semester.name} semester is today.`);
          scheduleDateNotification(semester.mid_semester_exam.start_date, `${semester.name} Mid Semester Exam Starts`, `The mid semester exam for the ${semester.name} semester is Coming Soon`);
          scheduleDateNotification(semester.mid_semester_exam.end_date, `${semester.name} Mid Semester Exam Ends`, `The mid semester exam for the ${semester.name} semester ending Soon.`);
          scheduleDateNotification(semester.preparatory_leave.start_date, `${semester.name} Preparatory Leave Starts`, `The preparatory leave for the ${semester.name} semester starting Soon.`);
          scheduleDateNotification(semester.preparatory_leave.end_date, `${semester.name} Preparatory Leave Ends`, `The preparatory leave for the ${semester.name} semester ending Soon. Are you Ready??`);
          scheduleDateNotification(semester.final_exam.start_date, `${semester.name} Final Exam Starts`, `The final exam for the ${semester.name} semester starting Soon.Get Ready !!!`);
          scheduleDateNotification(semester.final_exam.end_date, `${semester.name} Final Exam Ends`, `The final exam for the ${semester.name} semester ending Soon.`);
          scheduleDateNotification(semester.repeat_exam_registration.start_date, `${semester.name} Repeat Exam Registration Starts`, `Registration for the repeat exam for the ${semester.name} semester starts Soon.`);
          scheduleDateNotification(semester.repeat_exam_registration.end_date, `${semester.name} Repeat Exam Registration Ends`, `Registration for the repeat exam for the ${semester.name} semester ends Soon.`);
          scheduleDateNotification(semester.repeat_exam.start_date, `${semester.name} Repeat Exam Starts`, `The repeat exam for the ${semester.name} semester starts Soon.`);
          scheduleDateNotification(semester.repeat_exam.end_date, `${semester.name} Repeat Exam Ends`, `The repeat exam for the ${semester.name} semester ends Soon.`);
          scheduleDateNotification(semester.registration_next_semester.start_date, `${semester.name} Next Semester Registration Starts`, `Registration for the next semester starts today.`);
          scheduleDateNotification(semester.registration_next_semester.end_date, `${semester.name} Next Semester Registration Ends`, `Registration for the next semester ends today.`);

          semester.payment_deadlines.forEach((deadline: any) => {
            scheduleDateNotification(deadline.date, `${semester.name} ${deadline.type} Payment Deadline`, `The ${deadline.type} payment deadline for the ${semester.name} semester is today.`);
        });
      });
  
        holidays.forEach((holiday: any) => {
          if (holiday.date) {
            scheduleDateNotification(holiday.date, `Holiday: ${holiday.name}`, `Today is ${holiday.name}.`);
          }
        });
      }
    })();
  }, [semesters, holidays]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Academic Year {year}</Text>

      {semesters.map((semester: Semester, index: number) => (
        <View key={index} style={styles.semesterContainer}>
          <View style={styles.sectionHeader}>
            <Ionicons name="school" size={24} color="black" />
            <Text style={styles.semesterHeader}>{semester.name}</Text>
          </View>
          <Text style={styles.dateText}>Start Date: {formatDate(semester.start_date)}</Text>
          <Text style={styles.dateText}>End Date: {formatDate(semester.end_date)}</Text>

          <View style={styles.sectionHeader}>
            <Ionicons name="calendar" size={24} color="black" />
            <Text style={styles.subHeader}>Registration:</Text>
          </View>
          <Text style={styles.dateText}>Start Date: {formatDate(semester.registration.start_date)}</Text>
          <Text style={styles.dateText}>End Date: {formatDate(semester.registration.end_date)}</Text>

          <View style={styles.sectionHeader}>
            <Ionicons name="people" size={24} color="black" />
            <Text style={styles.subHeader}>Advisors Meeting:</Text>
          </View>
          <Text style={styles.dateText}>Date: {formatDate(semester.advisors_meeting.date)}</Text>

          <View style={styles.sectionHeader}>
            <Ionicons name="book" size={24} color="black" />
            <Text style={styles.subHeader}>Classes Start:</Text>
          </View>
          <Text style={styles.dateText}>Date: {formatDate(semester.classes_start.date)}</Text>

          <View style={styles.sectionHeader}>
            <Ionicons name="time" size={24} color="black" />
            <Text style={styles.subHeader}>Add/Drop Course Deadline:</Text>
          </View>
          <Text style={styles.dateText}>Date: {formatDate(semester.add_drop_deadline.date)}</Text>
          <Text style={styles.dateText}>Type: {semester.add_drop_deadline.type}</Text>

          <View style={styles.sectionHeader}>
            <Ionicons name="pencil" size={24} color="black" />
            <Text style={styles.subHeader}>Mid Semester Exam:</Text>
          </View>
          <Text style={styles.dateText}>Start Date: {formatDate(semester.mid_semester_exam.start_date)}</Text>
          <Text style={styles.dateText}>End Date: {formatDate(semester.mid_semester_exam.end_date)}</Text>

          <View style={styles.sectionHeader}>
            <Ionicons name="walk" size={24} color="black" />
            <Text style={styles.subHeader}>Preparatory Leave:</Text>
          </View>
          <Text style={styles.dateText}>Start Date: {formatDate(semester.preparatory_leave.start_date)}</Text>
          <Text style={styles.dateText}>End Date: {formatDate(semester.preparatory_leave.end_date)}</Text>

          <View style={styles.sectionHeader}>
            <Ionicons name="clipboard" size={24} color="black" />
            <Text style={styles.subHeader}>Final Exam:</Text>
          </View>
          <Text style={styles.dateText}>Start Date: {formatDate(semester.final_exam.start_date)}</Text>
          <Text style={styles.dateText}>End Date: {formatDate(semester.final_exam.end_date)}</Text>

          <View style={styles.sectionHeader}>
            <Ionicons name="mic" size={24} color="black" />
            <Text style={styles.subHeader}>Oral Exam:</Text>
          </View>
          <Text style={styles.dateText}>Start Date: {formatDate(semester.oral_exam.start_date)}</Text>
          <Text style={styles.dateText}>End Date: {formatDate(semester.oral_exam.end_date)}</Text>
          <Text style={styles.dateText}>Programs: {semester.oral_exam.programs.join(', ')}</Text>

          <View style={styles.sectionHeader}>
            <Ionicons name="repeat" size={24} color="black" />
            <Text style={styles.subHeader}>Repeat Exam Registration:</Text>
          </View>
          <Text style={styles.dateText}>Start Date: {formatDate(semester.repeat_exam_registration.start_date)}</Text>
          <Text style={styles.dateText}>End Date: {formatDate(semester.repeat_exam_registration.end_date)}</Text>

          <View style={styles.sectionHeader}>
            <Ionicons name="sync" size={24} color="black" />
            <Text style={styles.subHeader}>Repeat Exam:</Text>
          </View>
          <Text style={styles.dateText}>Start Date: {formatDate(semester.repeat_exam.start_date)}</Text>
          <Text style={styles.dateText}>End Date: {formatDate(semester.repeat_exam.end_date)}</Text>

          <View style={styles.sectionHeader}>
            <Ionicons name="add" size={24} color="black" />
            <Text style={styles.subHeader}>Next Semester Registration:</Text>
          </View>
          <Text style={styles.dateText}>Start Date: {formatDate(semester.registration_next_semester.start_date)}</Text>
          <Text style={styles.dateText}>End Date: {formatDate(semester.registration_next_semester.end_date)}</Text>

          <View style={styles.sectionHeader}>
            <Ionicons name="cash" size={24} color="black" />
            <Text style={styles.subHeader}>Payment Deadlines:</Text>
          </View>
          {semester.payment_deadlines.map((deadline: PaymentDeadline, idx: number) => (
            <View key={idx} style={styles.deadlineContainer}>
              <Text style={styles.dateText}>{deadline.type}: {formatDate(deadline.date)}</Text>
            </View>
          ))}
        </View>
      ))}

<View style={styles.holidaysContainer}>
        <Text style={styles.header}>Holidays</Text>
        <View style={styles.tableHeader}>
          <Text style={[styles.tableCell, styles.headerText]}>Particulars</Text>
          <Text style={[styles.tableCell, styles.headerText]}>University and Govt. holiday</Text>
        </View>
        {holidays.map((holiday: Holiday, index: number) => (
          <View key={index} style={styles.tableRow}>
            <Text style={styles.tableCell}>{holiday.name}</Text>
            <Text style={styles.tableCell}>
              {holiday.date && formatDate(holiday.date)}
              {holiday.start_date && holiday.end_date && `${formatDate(holiday.start_date)} - ${formatDate(holiday.end_date)}`}
            </Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  header: {
    fontSize: 24,
    fontFamily: 'Poppins-medium',
    marginBottom: 10,
    textAlign: 'center',
  },
  semesterContainer: {
    marginBottom: 20,
    padding: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
    fontFamily: 'Poppins-Regular',
  },
  semesterHeader: {
    fontSize: 20,
    marginLeft: 5,
    fontFamily: 'Poppins-medium',
  },
  subHeader: {
    fontSize: 18,
    marginLeft: 5,
    color: '#0c0c0c',
    fontFamily: 'Poppins-medium',
  },
  dateText: {
    fontSize: 16,
    marginBottom: 5,
    fontFamily: 'Poppins-Regular',
  },
  deadlineContainer: {
    marginBottom: 5,
    backgroundColor: '#f6de8d',
    padding: 5,
  },
  holidaysContainer: {
    marginBottom: 20,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#d3f2b9',
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  tableCell: {
    flex: 1,
    textAlign: 'left',
    padding: 5,
  },
  headerText: {
    fontWeight: 'bold',
    fontFamily: 'Poppins-Regular',
  },
});

export default Academic;
