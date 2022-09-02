package io.pulse.api.dto;

import io.pulse.api.model.entity.Employee;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class EmployeeDTO {
    private Integer id;
    private String name;
    private List<SkillDTO> skills;
    public Employee toEmployee(){
        Employee employee = new Employee();
        employee.setId(this.id);
        employee.setName(this.name);
        return employee;
    }
    public EmployeeDTO(Employee employee){
        this.setId(employee.getId());
        this.setName(employee.getName());
    }
}
