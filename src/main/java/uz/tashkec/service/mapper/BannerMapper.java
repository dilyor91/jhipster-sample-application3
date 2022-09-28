package uz.tashkec.service.mapper;

import org.mapstruct.*;
import uz.tashkec.domain.Banner;
import uz.tashkec.service.dto.BannerDTO;

/**
 * Mapper for the entity {@link Banner} and its DTO {@link BannerDTO}.
 */
@Mapper(componentModel = "spring")
public interface BannerMapper extends EntityMapper<BannerDTO, Banner> {}
