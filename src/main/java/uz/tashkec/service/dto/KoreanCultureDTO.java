package uz.tashkec.service.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import java.io.Serializable;
import java.util.Objects;
import javax.validation.constraints.*;

/**
 * A DTO for the {@link uz.tashkec.domain.KoreanCulture} entity.
 */
@Schema(description = "Культура Кореи")
@SuppressWarnings("common-java:DuplicatedBlocks")
public class KoreanCultureDTO implements Serializable {

    private Long id;

    @Size(max = 1024)
    private String titleUz;

    @Size(max = 1024)
    private String titleRu;

    @Size(max = 1024)
    private String titleKr;

    @Size(max = 4000)
    private String contentUz;

    @Size(max = 4000)
    private String contentRu;

    @Size(max = 4000)
    private String contentKr;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitleUz() {
        return titleUz;
    }

    public void setTitleUz(String titleUz) {
        this.titleUz = titleUz;
    }

    public String getTitleRu() {
        return titleRu;
    }

    public void setTitleRu(String titleRu) {
        this.titleRu = titleRu;
    }

    public String getTitleKr() {
        return titleKr;
    }

    public void setTitleKr(String titleKr) {
        this.titleKr = titleKr;
    }

    public String getContentUz() {
        return contentUz;
    }

    public void setContentUz(String contentUz) {
        this.contentUz = contentUz;
    }

    public String getContentRu() {
        return contentRu;
    }

    public void setContentRu(String contentRu) {
        this.contentRu = contentRu;
    }

    public String getContentKr() {
        return contentKr;
    }

    public void setContentKr(String contentKr) {
        this.contentKr = contentKr;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof KoreanCultureDTO)) {
            return false;
        }

        KoreanCultureDTO koreanCultureDTO = (KoreanCultureDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, koreanCultureDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "KoreanCultureDTO{" +
            "id=" + getId() +
            ", titleUz='" + getTitleUz() + "'" +
            ", titleRu='" + getTitleRu() + "'" +
            ", titleKr='" + getTitleKr() + "'" +
            ", contentUz='" + getContentUz() + "'" +
            ", contentRu='" + getContentRu() + "'" +
            ", contentKr='" + getContentKr() + "'" +
            "}";
    }
}
