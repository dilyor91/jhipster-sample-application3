package uz.tashkec.service.mapper;

import org.mapstruct.*;
import uz.tashkec.domain.Attachment;
import uz.tashkec.domain.KoreanCulture;
import uz.tashkec.service.dto.AttachmentDTO;
import uz.tashkec.service.dto.KoreanCultureDTO;

/**
 * Mapper for the entity {@link Attachment} and its DTO {@link AttachmentDTO}.
 */
@Mapper(componentModel = "spring")
public interface AttachmentMapper extends EntityMapper<AttachmentDTO, Attachment> {
    @Mapping(target = "koreanCulture", source = "koreanCulture", qualifiedByName = "koreanCultureId")
    AttachmentDTO toDto(Attachment s);

    @Named("koreanCultureId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    KoreanCultureDTO toDtoKoreanCultureId(KoreanCulture koreanCulture);
}
