package uz.tashkec.service.mapper;

import org.mapstruct.*;
import uz.tashkec.domain.MaterialTopic;
import uz.tashkec.domain.MaterialTopicLevel;
import uz.tashkec.service.dto.MaterialTopicDTO;
import uz.tashkec.service.dto.MaterialTopicLevelDTO;

/**
 * Mapper for the entity {@link MaterialTopic} and its DTO {@link MaterialTopicDTO}.
 */
@Mapper(componentModel = "spring")
public interface MaterialTopicMapper extends EntityMapper<MaterialTopicDTO, MaterialTopic> {
    @Mapping(target = "materialTopicLevel", source = "materialTopicLevel", qualifiedByName = "materialTopicLevelId")
    MaterialTopicDTO toDto(MaterialTopic s);

    @Named("materialTopicLevelId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    MaterialTopicLevelDTO toDtoMaterialTopicLevelId(MaterialTopicLevel materialTopicLevel);
}
