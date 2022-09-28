package uz.tashkec.service.mapper;

import org.mapstruct.*;
import uz.tashkec.domain.WorkPlan;
import uz.tashkec.service.dto.WorkPlanDTO;

/**
 * Mapper for the entity {@link WorkPlan} and its DTO {@link WorkPlanDTO}.
 */
@Mapper(componentModel = "spring")
public interface WorkPlanMapper extends EntityMapper<WorkPlanDTO, WorkPlan> {}
