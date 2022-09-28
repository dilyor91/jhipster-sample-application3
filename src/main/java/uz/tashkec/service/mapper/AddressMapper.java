package uz.tashkec.service.mapper;

import org.mapstruct.*;
import uz.tashkec.domain.Address;
import uz.tashkec.service.dto.AddressDTO;

/**
 * Mapper for the entity {@link Address} and its DTO {@link AddressDTO}.
 */
@Mapper(componentModel = "spring")
public interface AddressMapper extends EntityMapper<AddressDTO, Address> {}
