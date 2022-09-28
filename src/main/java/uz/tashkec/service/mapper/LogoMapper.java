package uz.tashkec.service.mapper;

import org.mapstruct.*;
import uz.tashkec.domain.Logo;
import uz.tashkec.service.dto.LogoDTO;

/**
 * Mapper for the entity {@link Logo} and its DTO {@link LogoDTO}.
 */
@Mapper(componentModel = "spring")
public interface LogoMapper extends EntityMapper<LogoDTO, Logo> {}
