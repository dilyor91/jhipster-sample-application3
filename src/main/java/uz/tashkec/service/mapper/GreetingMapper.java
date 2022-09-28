package uz.tashkec.service.mapper;

import org.mapstruct.*;
import uz.tashkec.domain.Greeting;
import uz.tashkec.service.dto.GreetingDTO;

/**
 * Mapper for the entity {@link Greeting} and its DTO {@link GreetingDTO}.
 */
@Mapper(componentModel = "spring")
public interface GreetingMapper extends EntityMapper<GreetingDTO, Greeting> {}
