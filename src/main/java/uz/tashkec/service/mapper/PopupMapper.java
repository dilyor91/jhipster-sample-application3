package uz.tashkec.service.mapper;

import org.mapstruct.*;
import uz.tashkec.domain.Attachment;
import uz.tashkec.domain.Popup;
import uz.tashkec.service.dto.AttachmentDTO;
import uz.tashkec.service.dto.PopupDTO;

/**
 * Mapper for the entity {@link Popup} and its DTO {@link PopupDTO}.
 */
@Mapper(componentModel = "spring")
public interface PopupMapper extends EntityMapper<PopupDTO, Popup> {
    @Mapping(target = "attachment", source = "attachment", qualifiedByName = "attachmentId")
    PopupDTO toDto(Popup s);

    @Named("attachmentId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    AttachmentDTO toDtoAttachmentId(Attachment attachment);
}
