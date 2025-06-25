package com.student.demostudent.model;

import java.util.HashMap;
import java.util.Map;

import jakarta.persistence.CollectionTable;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Embeddable;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.MapKeyColumn;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

@Entity
public class Student {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NotBlank(message = "Name is required")
    private String name;
    @NotBlank(message = "Email is required")
    @Email(message = "Invalid email format")
    private String email;
    @NotBlank(message = "Branch is required")
    private String branch;
    @NotBlank(message = "Academic year is required")
    private String academicYear;
    @NotBlank(message = "Semester is required")
    private String semester;
    private String phone;
    private String fatherName;
    private String motherName;
    private String city;

    // Attendance: subject -> AttendanceRecord (total, attended)
    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "student_attendance", joinColumns = @JoinColumn(name = "student_id"))
    @MapKeyColumn(name = "subject")
    private Map<String, AttendanceRecord> attendance = new HashMap<>();

    public Student() {}

    public Student(String name, String email, String branch, String academicYear, String semester) {
        this.name = name;
        this.email = email;
        this.branch = branch;
        this.academicYear = academicYear;
        this.semester = semester;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getBranch() { return branch; }
    public void setBranch(String branch) { this.branch = branch; }
    public String getAcademicYear() { return academicYear; }
    public void setAcademicYear(String academicYear) { this.academicYear = academicYear; }
    public String getSemester() { return semester; }
    public void setSemester(String semester) { this.semester = semester; }
    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }
    public String getFatherName() { return fatherName; }
    public void setFatherName(String fatherName) { this.fatherName = fatherName; }
    public String getMotherName() { return motherName; }
    public void setMotherName(String motherName) { this.motherName = motherName; }
    public String getCity() { return city; }
    public void setCity(String city) { this.city = city; }
    public Map<String, AttendanceRecord> getAttendance() { return attendance; }
    public void setAttendance(Map<String, AttendanceRecord> attendance) { this.attendance = attendance; }

    @Embeddable
    public static class AttendanceRecord {
        private int total;
        private int attended;

        public AttendanceRecord() {}
        public AttendanceRecord(int total, int attended) {
            this.total = total;
            this.attended = attended;
        }
        public int getTotal() { return total; }
        public void setTotal(int total) { this.total = total; }
        public int getAttended() { return attended; }
        public void setAttended(int attended) { this.attended = attended; }
    }
}
