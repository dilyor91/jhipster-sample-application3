package uz.tashkec.service.mapper;

import org.mapstruct.*;
import uz.tashkec.domain.Country;
import uz.tashkec.domain.Region;
import uz.tashkec.service.dto.CountryDTO;
import uz.tashkec.service.dto.RegionDTO;

/**
 * Mapper for the entity {@link Country} and its DTO {@link CountryDTO}.
 */
@Mapper(componentModel = "spring")
public interface CountryMapper extends EntityMapper<CountryDTO, Country> {
    @Mapping(target = "region", source = "region", qualifiedByName = "regionId")
    CountryDTO toDto(Country s);

    @Named("regionId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    RegionDTO toDtoRegionId(Region region);
}
