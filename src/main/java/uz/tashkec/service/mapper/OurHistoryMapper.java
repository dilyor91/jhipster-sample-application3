package uz.tashkec.service.mapper;

import org.mapstruct.*;
import uz.tashkec.domain.OurHistory;
import uz.tashkec.service.dto.OurHistoryDTO;

/**
 * Mapper for the entity {@link OurHistory} and its DTO {@link OurHistoryDTO}.
 */
@Mapper(componentModel = "spring")
public interface OurHistoryMapper extends EntityMapper<OurHistoryDTO, OurHistory> {}
