package uz.tashkec.service.mapper;

import org.mapstruct.*;
import uz.tashkec.domain.Owner;
import uz.tashkec.service.dto.OwnerDTO;

/**
 * Mapper for the entity {@link Owner} and its DTO {@link OwnerDTO}.
 */
@Mapper(componentModel = "spring")
public interface OwnerMapper extends EntityMapper<OwnerDTO, Owner> {}
