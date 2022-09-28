package uz.tashkec.service.dto;

import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link uz.tashkec.domain.FileTopic} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class FileTopicDTO implements Serializable {

    private Long id;

    private String fileOrginalName;

    private String fileNameUz;

    private String fileNameRu;

    private String fileNameKr;

    private String fileType;

    private Long fileSize;

    private String filePath;

    private MaterialTopicLevelDTO materialTopicLevel;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFileOrginalName() {
        return fileOrginalName;
    }

    public void setFileOrginalName(String fileOrginalName) {
        this.fileOrginalName = fileOrginalName;
    }

    public String getFileNameUz() {
        return fileNameUz;
    }

    public void setFileNameUz(String fileNameUz) {
        this.fileNameUz = fileNameUz;
    }

    public String getFileNameRu() {
        return fileNameRu;
    }

    public void setFileNameRu(String fileNameRu) {
        this.fileNameRu = fileNameRu;
    }

    public String getFileNameKr() {
        return fileNameKr;
    }

    public void setFileNameKr(String fileNameKr) {
        this.fileNameKr = fileNameKr;
    }

    public String getFileType() {
        return fileType;
    }

    public void setFileType(String fileType) {
        this.fileType = fileType;
    }

    public Long getFileSize() {
        return fileSize;
    }

    public void setFileSize(Long fileSize) {
        this.fileSize = fileSize;
    }

    public String getFilePath() {
        return filePath;
    }

    public void setFilePath(String filePath) {
        this.filePath = filePath;
    }

    public MaterialTopicLevelDTO getMaterialTopicLevel() {
        return materialTopicLevel;
    }

    public void setMaterialTopicLevel(MaterialTopicLevelDTO materialTopicLevel) {
        this.materialTopicLevel = materialTopicLevel;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof FileTopicDTO)) {
            return false;
        }

        FileTopicDTO fileTopicDTO = (FileTopicDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, fileTopicDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "FileTopicDTO{" +
            "id=" + getId() +
            ", fileOrginalName='" + getFileOrginalName() + "'" +
            ", fileNameUz='" + getFileNameUz() + "'" +
            ", fileNameRu='" + getFileNameRu() + "'" +
            ", fileNameKr='" + getFileNameKr() + "'" +
            ", fileType='" + getFileType() + "'" +
            ", fileSize=" + getFileSize() +
            ", filePath='" + getFilePath() + "'" +
            ", materialTopicLevel=" + getMaterialTopicLevel() +
            "}";
    }
}
