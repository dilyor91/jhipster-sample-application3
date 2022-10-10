package uz.tashkec.service.mapper;

import org.mapstruct.*;
import uz.tashkec.domain.Attachment;
import uz.tashkec.domain.Partner;
import uz.tashkec.service.dto.AttachmentDTO;
import uz.tashkec.service.dto.PartnerDTO;

/**
 * Mapper for the entity {@link Partner} and its DTO {@link PartnerDTO}.
 */
@Mapper(componentModel = "spring")
public interface PartnerMapper extends EntityMapper<PartnerDTO, Partner> {
    @Mapping(target = "attachment", source = "attachment", qualifiedByName = "attachmentId")
    PartnerDTO toDto(Partner s);

    @Named("attachmentId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    AttachmentDTO toDtoAttachmentId(Attachment attachment);
}
