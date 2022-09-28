package uz.tashkec.service.dto;

import java.io.Serializable;
import java.util.Objects;
import uz.tashkec.domain.enumeration.FileEntity;

/**
 * A DTO for the {@link uz.tashkec.domain.File} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class FileDTO implements Serializable {

    private Long id;

    private String orginalName;

    private String fileName;

    private Long fileSize;

    private String fileFormat;

    private String filePath;

    private FileEntity fileEntity;

    private InstitutionDTO institution;

    private StudyAtKoreaDTO studyAtKorea;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getOrginalName() {
        return orginalName;
    }

    public void setOrginalName(String orginalName) {
        this.orginalName = orginalName;
    }

    public String getFileName() {
        return fileName;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    public Long getFileSize() {
        return fileSize;
    }

    public void setFileSize(Long fileSize) {
        this.fileSize = fileSize;
    }

    public String getFileFormat() {
        return fileFormat;
    }

    public void setFileFormat(String fileFormat) {
        this.fileFormat = fileFormat;
    }

    public String getFilePath() {
        return filePath;
    }

    public void setFilePath(String filePath) {
        this.filePath = filePath;
    }

    public FileEntity getFileEntity() {
        return fileEntity;
    }

    public void setFileEntity(FileEntity fileEntity) {
        this.fileEntity = fileEntity;
    }

    public InstitutionDTO getInstitution() {
        return institution;
    }

    public void setInstitution(InstitutionDTO institution) {
        this.institution = institution;
    }

    public StudyAtKoreaDTO getStudyAtKorea() {
        return studyAtKorea;
    }

    public void setStudyAtKorea(StudyAtKoreaDTO studyAtKorea) {
        this.studyAtKorea = studyAtKorea;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof FileDTO)) {
            return false;
        }

        FileDTO fileDTO = (FileDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, fileDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "FileDTO{" +
            "id=" + getId() +
            ", orginalName='" + getOrginalName() + "'" +
            ", fileName='" + getFileName() + "'" +
            ", fileSize=" + getFileSize() +
            ", fileFormat='" + getFileFormat() + "'" +
            ", filePath='" + getFilePath() + "'" +
            ", fileEntity='" + getFileEntity() + "'" +
            ", institution=" + getInstitution() +
            ", studyAtKorea=" + getStudyAtKorea() +
            "}";
    }
}
