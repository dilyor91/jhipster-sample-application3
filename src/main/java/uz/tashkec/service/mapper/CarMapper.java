package uz.tashkec.service.mapper;

import org.mapstruct.*;
import uz.tashkec.domain.Car;
import uz.tashkec.domain.Owner;
import uz.tashkec.service.dto.CarDTO;
import uz.tashkec.service.dto.OwnerDTO;

/**
 * Mapper for the entity {@link Car} and its DTO {@link CarDTO}.
 */
@Mapper(componentModel = "spring")
public interface CarMapper extends EntityMapper<CarDTO, Car> {
    @Mapping(target = "owner", source = "owner", qualifiedByName = "ownerId")
    CarDTO toDto(Car s);

    @Named("ownerId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    OwnerDTO toDtoOwnerId(Owner owner);
}
