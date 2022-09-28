package uz.tashkec.service.mapper;

import org.mapstruct.*;
import uz.tashkec.domain.Events;
import uz.tashkec.service.dto.EventsDTO;

/**
 * Mapper for the entity {@link Events} and its DTO {@link EventsDTO}.
 */
@Mapper(componentModel = "spring")
public interface EventsMapper extends EntityMapper<EventsDTO, Events> {}
