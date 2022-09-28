package uz.tashkec.service.mapper;

import org.mapstruct.*;
import uz.tashkec.domain.Album;
import uz.tashkec.service.dto.AlbumDTO;

/**
 * Mapper for the entity {@link Album} and its DTO {@link AlbumDTO}.
 */
@Mapper(componentModel = "spring")
public interface AlbumMapper extends EntityMapper<AlbumDTO, Album> {}
