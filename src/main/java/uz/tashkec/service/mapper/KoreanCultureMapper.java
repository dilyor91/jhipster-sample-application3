package uz.tashkec.service.mapper;

import org.mapstruct.*;
import uz.tashkec.domain.KoreanCulture;
import uz.tashkec.service.dto.KoreanCultureDTO;

/**
 * Mapper for the entity {@link KoreanCulture} and its DTO {@link KoreanCultureDTO}.
 */
@Mapper(componentModel = "spring")
public interface KoreanCultureMapper extends EntityMapper<KoreanCultureDTO, KoreanCulture> {}
