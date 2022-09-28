package uz.tashkec.service.mapper;

import org.mapstruct.*;
import uz.tashkec.domain.File;
import uz.tashkec.domain.Institution;
import uz.tashkec.domain.StudyAtKorea;
import uz.tashkec.service.dto.FileDTO;
import uz.tashkec.service.dto.InstitutionDTO;
import uz.tashkec.service.dto.StudyAtKoreaDTO;

/**
 * Mapper for the entity {@link File} and its DTO {@link FileDTO}.
 */
@Mapper(componentModel = "spring")
public interface FileMapper extends EntityMapper<FileDTO, File> {
    @Mapping(target = "institution", source = "institution", qualifiedByName = "institutionId")
    @Mapping(target = "studyAtKorea", source = "studyAtKorea", qualifiedByName = "studyAtKoreaId")
    FileDTO toDto(File s);

    @Named("institutionId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    InstitutionDTO toDtoInstitutionId(Institution institution);

    @Named("studyAtKoreaId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    StudyAtKoreaDTO toDtoStudyAtKoreaId(StudyAtKorea studyAtKorea);
}
