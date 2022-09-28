package uz.tashkec.service.mapper;

import org.mapstruct.*;
import uz.tashkec.domain.CenterStructure;
import uz.tashkec.service.dto.CenterStructureDTO;

/**
 * Mapper for the entity {@link CenterStructure} and its DTO {@link CenterStructureDTO}.
 */
@Mapper(componentModel = "spring")
public interface CenterStructureMapper extends EntityMapper<CenterStructureDTO, CenterStructure> {}
