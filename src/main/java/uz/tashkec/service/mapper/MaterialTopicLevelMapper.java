package uz.tashkec.service.mapper;

import org.mapstruct.*;
import uz.tashkec.domain.MaterialTopicLevel;
import uz.tashkec.service.dto.MaterialTopicLevelDTO;

/**
 * Mapper for the entity {@link MaterialTopicLevel} and its DTO {@link MaterialTopicLevelDTO}.
 */
@Mapper(componentModel = "spring")
public interface MaterialTopicLevelMapper extends EntityMapper<MaterialTopicLevelDTO, MaterialTopicLevel> {}
