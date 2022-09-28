package uz.tashkec.service.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import java.io.Serializable;
import java.util.Objects;
import javax.validation.constraints.*;

/**
 * A DTO for the {@link uz.tashkec.domain.Attachment} entity.
 */
@Schema(description = "Файлы. Логотипы также хранятся здесь с типом LOGO")
@SuppressWarnings("common-java:DuplicatedBlocks")
public class AttachmentDTO implements Serializable {

    private Long id;

    private String fileNameUz;

    private String fileNameRu;

    private String fileNameKr;

    private String path;

    private String originalFileName;

    private String contentType;

    private Integer fileSize;

    @Size(max = 8)
    private String suffix;

    private String thumbnailFileName;

    private String bucketName;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public String getPath() {
        return path;
    }

    public void setPath(String path) {
        this.path = path;
    }

    public String getOriginalFileName() {
        return originalFileName;
    }

    public void setOriginalFileName(String originalFileName) {
        this.originalFileName = originalFileName;
    }

    public String getContentType() {
        return contentType;
    }

    public void setContentType(String contentType) {
        this.contentType = contentType;
    }

    public Integer getFileSize() {
        return fileSize;
    }

    public void setFileSize(Integer fileSize) {
        this.fileSize = fileSize;
    }

    public String getSuffix() {
        return suffix;
    }

    public void setSuffix(String suffix) {
        this.suffix = suffix;
    }

    public String getThumbnailFileName() {
        return thumbnailFileName;
    }

    public void setThumbnailFileName(String thumbnailFileName) {
        this.thumbnailFileName = thumbnailFileName;
    }

    public String getBucketName() {
        return bucketName;
    }

    public void setBucketName(String bucketName) {
        this.bucketName = bucketName;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof AttachmentDTO)) {
            return false;
        }

        AttachmentDTO attachmentDTO = (AttachmentDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, attachmentDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "AttachmentDTO{" +
            "id=" + getId() +
            ", fileNameUz='" + getFileNameUz() + "'" +
            ", fileNameRu='" + getFileNameRu() + "'" +
            ", fileNameKr='" + getFileNameKr() + "'" +
            ", path='" + getPath() + "'" +
            ", originalFileName='" + getOriginalFileName() + "'" +
            ", contentType='" + getContentType() + "'" +
            ", fileSize=" + getFileSize() +
            ", suffix='" + getSuffix() + "'" +
            ", thumbnailFileName='" + getThumbnailFileName() + "'" +
            ", bucketName='" + getBucketName() + "'" +
            "}";
    }
}
