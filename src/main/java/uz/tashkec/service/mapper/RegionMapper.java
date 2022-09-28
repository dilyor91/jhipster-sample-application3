package uz.tashkec.service.mapper;

import org.mapstruct.*;
import uz.tashkec.domain.Region;
import uz.tashkec.service.dto.RegionDTO;

/**
 * Mapper for the entity {@link Region} and its DTO {@link RegionDTO}.
 */
@Mapper(componentModel = "spring")
public interface RegionMapper extends EntityMapper<RegionDTO, Region> {}
