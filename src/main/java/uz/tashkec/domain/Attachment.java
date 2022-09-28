package uz.tashkec.domain;

import java.io.Serializable;
import javax.persistence.*;
import javax.validation.constraints.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * Файлы. Логотипы также хранятся здесь с типом LOGO
 */
@Entity
@Table(name = "attachment")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Attachment implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @Column(name = "file_name_uz")
    private String fileNameUz;

    @Column(name = "file_name_ru")
    private String fileNameRu;

    @Column(name = "file_name_kr")
    private String fileNameKr;

    @Column(name = "path")
    private String path;

    @Column(name = "original_file_name")
    private String originalFileName;

    @Column(name = "content_type")
    private String contentType;

    @Column(name = "file_size")
    private Integer fileSize;

    @Size(max = 8)
    @Column(name = "suffix", length = 8)
    private String suffix;

    @Column(name = "thumbnail_file_name")
    private String thumbnailFileName;

    @Column(name = "bucket_name")
    private String bucketName;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Attachment id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFileNameUz() {
        return this.fileNameUz;
    }

    public Attachment fileNameUz(String fileNameUz) {
        this.setFileNameUz(fileNameUz);
        return this;
    }

    public void setFileNameUz(String fileNameUz) {
        this.fileNameUz = fileNameUz;
    }

    public String getFileNameRu() {
        return this.fileNameRu;
    }

    public Attachment fileNameRu(String fileNameRu) {
        this.setFileNameRu(fileNameRu);
        return this;
    }

    public void setFileNameRu(String fileNameRu) {
        this.fileNameRu = fileNameRu;
    }

    public String getFileNameKr() {
        return this.fileNameKr;
    }

    public Attachment fileNameKr(String fileNameKr) {
        this.setFileNameKr(fileNameKr);
        return this;
    }

    public void setFileNameKr(String fileNameKr) {
        this.fileNameKr = fileNameKr;
    }

    public String getPath() {
        return this.path;
    }

    public Attachment path(String path) {
        this.setPath(path);
        return this;
    }

    public void setPath(String path) {
        this.path = path;
    }

    public String getOriginalFileName() {
        return this.originalFileName;
    }

    public Attachment originalFileName(String originalFileName) {
        this.setOriginalFileName(originalFileName);
        return this;
    }

    public void setOriginalFileName(String originalFileName) {
        this.originalFileName = originalFileName;
    }

    public String getContentType() {
        return this.contentType;
    }

    public Attachment contentType(String contentType) {
        this.setContentType(contentType);
        return this;
    }

    public void setContentType(String contentType) {
        this.contentType = contentType;
    }

    public Integer getFileSize() {
        return this.fileSize;
    }

    public Attachment fileSize(Integer fileSize) {
        this.setFileSize(fileSize);
        return this;
    }

    public void setFileSize(Integer fileSize) {
        this.fileSize = fileSize;
    }

    public String getSuffix() {
        return this.suffix;
    }

    public Attachment suffix(String suffix) {
        this.setSuffix(suffix);
        return this;
    }

    public void setSuffix(String suffix) {
        this.suffix = suffix;
    }

    public String getThumbnailFileName() {
        return this.thumbnailFileName;
    }

    public Attachment thumbnailFileName(String thumbnailFileName) {
        this.setThumbnailFileName(thumbnailFileName);
        return this;
    }

    public void setThumbnailFileName(String thumbnailFileName) {
        this.thumbnailFileName = thumbnailFileName;
    }

    public String getBucketName() {
        return this.bucketName;
    }

    public Attachment bucketName(String bucketName) {
        this.setBucketName(bucketName);
        return this;
    }

    public void setBucketName(String bucketName) {
        this.bucketName = bucketName;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Attachment)) {
            return false;
        }
        return id != null && id.equals(((Attachment) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Attachment{" +
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
