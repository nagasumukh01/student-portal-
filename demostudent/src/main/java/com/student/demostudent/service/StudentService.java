package com.student.demostudent.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.student.demostudent.model.Student;
import com.student.demostudent.repository.StudentRepository;

@Service
public class StudentService {
    @Autowired
    private StudentRepository studentRepository;

    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }

    public Optional<Student> getStudentById(Long id) {
        return studentRepository.findById(id);
    }

    public Student saveStudent(Student student) {
        return studentRepository.save(student);
    }

    public void deleteStudent(Long id) {
        studentRepository.deleteById(id);
    }

    // Pagination and filtering
    public Page<Student> getStudentsPaged(String search, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        if (search == null || search.isEmpty()) {
            return studentRepository.findAll(pageable);
        } else {
            return studentRepository.findByNameContainingIgnoreCaseOrEmailContainingIgnoreCaseOrBranchContainingIgnoreCase(
                search, search, search, pageable);
        }
    }
}
