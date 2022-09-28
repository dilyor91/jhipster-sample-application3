package uz.tashkec.service.mapper;

import org.mapstruct.*;
import uz.tashkec.domain.News;
import uz.tashkec.service.dto.NewsDTO;

/**
 * Mapper for the entity {@link News} and its DTO {@link NewsDTO}.
 */
@Mapper(componentModel = "spring")
public interface NewsMapper extends EntityMapper<NewsDTO, News> {}
