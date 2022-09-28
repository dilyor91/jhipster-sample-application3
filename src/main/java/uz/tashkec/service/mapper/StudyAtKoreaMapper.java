package uz.tashkec.service.mapper;

import org.mapstruct.*;
import uz.tashkec.domain.StudyAtKorea;
import uz.tashkec.service.dto.StudyAtKoreaDTO;

/**
 * Mapper for the entity {@link StudyAtKorea} and its DTO {@link StudyAtKoreaDTO}.
 */
@Mapper(componentModel = "spring")
public interface StudyAtKoreaMapper extends EntityMapper<StudyAtKoreaDTO, StudyAtKorea> {}
