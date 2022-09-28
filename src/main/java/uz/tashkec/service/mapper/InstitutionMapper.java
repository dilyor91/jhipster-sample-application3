package uz.tashkec.service.mapper;

import org.mapstruct.*;
import uz.tashkec.domain.Institution;
import uz.tashkec.service.dto.InstitutionDTO;

/**
 * Mapper for the entity {@link Institution} and its DTO {@link InstitutionDTO}.
 */
@Mapper(componentModel = "spring")
public interface InstitutionMapper extends EntityMapper<InstitutionDTO, Institution> {}
