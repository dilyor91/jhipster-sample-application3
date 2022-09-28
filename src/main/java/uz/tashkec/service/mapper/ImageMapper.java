package uz.tashkec.service.mapper;

import org.mapstruct.*;
import uz.tashkec.domain.Album;
import uz.tashkec.domain.Image;
import uz.tashkec.service.dto.AlbumDTO;
import uz.tashkec.service.dto.ImageDTO;

/**
 * Mapper for the entity {@link Image} and its DTO {@link ImageDTO}.
 */
@Mapper(componentModel = "spring")
public interface ImageMapper extends EntityMapper<ImageDTO, Image> {
    @Mapping(target = "image", source = "image", qualifiedByName = "albumId")
    ImageDTO toDto(Image s);

    @Named("albumId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    AlbumDTO toDtoAlbumId(Album album);
}
