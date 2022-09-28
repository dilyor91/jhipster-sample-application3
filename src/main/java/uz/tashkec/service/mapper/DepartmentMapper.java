package uz.tashkec.service.mapper;

import org.mapstruct.*;
import uz.tashkec.domain.Department;
import uz.tashkec.domain.Location;
import uz.tashkec.service.dto.DepartmentDTO;
import uz.tashkec.service.dto.LocationDTO;

/**
 * Mapper for the entity {@link Department} and its DTO {@link DepartmentDTO}.
 */
@Mapper(componentModel = "spring")
public interface DepartmentMapper extends EntityMapper<DepartmentDTO, Department> {
    @Mapping(target = "location", source = "location", qualifiedByName = "locationId")
    DepartmentDTO toDto(Department s);

    @Named("locationId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    LocationDTO toDtoLocationId(Location location);
}
