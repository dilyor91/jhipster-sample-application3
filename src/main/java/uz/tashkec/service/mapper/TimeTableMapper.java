package uz.tashkec.service.mapper;

import org.mapstruct.*;
import uz.tashkec.domain.TimeTable;
import uz.tashkec.service.dto.TimeTableDTO;

/**
 * Mapper for the entity {@link TimeTable} and its DTO {@link TimeTableDTO}.
 */
@Mapper(componentModel = "spring")
public interface TimeTableMapper extends EntityMapper<TimeTableDTO, TimeTable> {}
