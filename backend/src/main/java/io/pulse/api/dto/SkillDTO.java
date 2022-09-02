package io.pulse.api.dto;

import io.pulse.api.model.entity.Skill;
import io.pulse.api.repository.EmployeeRepository;
import io.pulse.api.repository.SkillRepository;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class SkillDTO {
    private Integer id;
    private Integer employeeId;
    private String  name;
    public Skill toSkill(EmployeeRepository employeeRepository){
        Skill skill = new Skill();
        skill.setEmployee(employeeRepository.findById(this.employeeId).get());
        skill.setId(this.id);
        skill.setName(this.name);
        return skill;
    }
    public SkillDTO(Skill skill){
        this.setId(skill.getId());
        this.setName(skill.getName());
    }
}
