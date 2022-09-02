package io.pulse.api.controller;

import io.pulse.api.dto.SkillDTO;
import io.pulse.api.model.entity.Skill;
import io.pulse.api.repository.EmployeeRepository;
import io.pulse.api.repository.SkillRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/skills")
public class SkillController {
    @Autowired
    SkillRepository skillRepository;
    @Autowired
    EmployeeRepository employeeRepository;
    @PostMapping
    public ResponseEntity addSkill(@RequestBody SkillDTO skillDTO){
        skillRepository.save(skillDTO.toSkill(employeeRepository));
        return new ResponseEntity(HttpStatus.OK);
    }
    @GetMapping
    public ResponseEntity getSkills(){
        List<SkillDTO> skillDTOList = new ArrayList<SkillDTO>();
        Iterable<Skill> skillIterable = skillRepository.findAllDistinct();
        skillIterable.forEach(skill -> {
            skillDTOList.add(new SkillDTO(skill));
        });
        return new ResponseEntity(skillDTOList,HttpStatus.OK);
    }
}
