package io.pulse.api.repository;

import io.pulse.api.model.entity.Skill;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface SkillRepository extends CrudRepository<Skill,Integer> {
    @Query("SELECT DISTINCT skill FROM Skill skill")
    Iterable<Skill> findAllDistinct();
    List<Skill> findByEmployeeId(Integer id);
}
