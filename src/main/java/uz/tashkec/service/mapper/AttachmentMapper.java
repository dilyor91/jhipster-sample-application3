package uz.tashkec.service.mapper;

import org.mapstruct.*;
import uz.tashkec.domain.Attachment;
import uz.tashkec.service.dto.AttachmentDTO;

/**
 * Mapper for the entity {@link Attachment} and its DTO {@link AttachmentDTO}.
 */
@Mapper(componentModel = "spring")
public interface AttachmentMapper extends EntityMapper<AttachmentDTO, Attachment> {}
