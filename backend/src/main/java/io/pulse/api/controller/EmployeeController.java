package io.pulse.api.controller;

import io.pulse.api.dto.EmployeeDTO;
import io.pulse.api.dto.SkillDTO;
import io.pulse.api.model.entity.Employee;
import io.pulse.api.model.entity.Skill;
import io.pulse.api.repository.EmployeeRepository;
import io.pulse.api.repository.SkillRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
@CrossOrigin
@RestController
@RequestMapping("/employees")
public class EmployeeController {
    @Autowired
    private EmployeeRepository employeeRepository;
    @Autowired
    private SkillRepository skillRepository;
    //Registra um empregado. Seu nome deve ser único.
    @PostMapping
    public ResponseEntity addEmployee(@RequestBody EmployeeDTO employeeDTO){
        Employee savedEmployee = employeeRepository.save(employeeDTO.toEmployee());
        return new ResponseEntity(new EmployeeDTO(savedEmployee),HttpStatus.OK);
    }
    @GetMapping
    public ResponseEntity getEmployees(){
        List<EmployeeDTO> employeeDTOList = new ArrayList<EmployeeDTO>();
        Iterable<Employee> employeeIterator = employeeRepository.findAll();
        employeeIterator.forEach(employee -> {
            EmployeeDTO employeeDTO = new EmployeeDTO(employee);
            employeeDTO.setSkills(new ArrayList<SkillDTO>());
            skillRepository.findByEmployeeId(employeeDTO.getId()).forEach(skill -> {
                employeeDTO.getSkills().add(new SkillDTO(skill));
            });
            employeeDTOList.add(employeeDTO);
        });
        return new ResponseEntity(employeeDTOList,HttpStatus.OK);
    }
    @DeleteMapping("/{employeeId}")
    public ResponseEntity deleteEmployee(@PathVariable("employeeId") Integer employeeId){
        employeeRepository.deleteById(employeeId);
        return new ResponseEntity(HttpStatus.OK);
    }
}
