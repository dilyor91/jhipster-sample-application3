package uz.tashkec.service.dto;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.Objects;

/**
 * A DTO for the {@link uz.tashkec.domain.OurHistory} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class OurHistoryDTO implements Serializable {

    private Long id;

    private String contentUz;

    private String contentRu;

    private String contentKr;

    private LocalDate postedDate;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public LocalDate getPostedDate() {
        return postedDate;
    }

    public void setPostedDate(LocalDate postedDate) {
        this.postedDate = postedDate;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof OurHistoryDTO)) {
            return false;
        }

        OurHistoryDTO ourHistoryDTO = (OurHistoryDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, ourHistoryDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "OurHistoryDTO{" +
            "id=" + getId() +
            ", contentUz='" + getContentUz() + "'" +
            ", contentRu='" + getContentRu() + "'" +
            ", contentKr='" + getContentKr() + "'" +
            ", postedDate='" + getPostedDate() + "'" +
            "}";
    }
}
