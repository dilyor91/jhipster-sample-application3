package uz.tashkec.service.mapper;

import org.mapstruct.*;
import uz.tashkec.domain.FileTopic;
import uz.tashkec.domain.MaterialTopicLevel;
import uz.tashkec.service.dto.FileTopicDTO;
import uz.tashkec.service.dto.MaterialTopicLevelDTO;

/**
 * Mapper for the entity {@link FileTopic} and its DTO {@link FileTopicDTO}.
 */
@Mapper(componentModel = "spring")
public interface FileTopicMapper extends EntityMapper<FileTopicDTO, FileTopic> {
    @Mapping(target = "materialTopicLevel", source = "materialTopicLevel", qualifiedByName = "materialTopicLevelId")
    FileTopicDTO toDto(FileTopic s);

    @Named("materialTopicLevelId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    MaterialTopicLevelDTO toDtoMaterialTopicLevelId(MaterialTopicLevel materialTopicLevel);
}
