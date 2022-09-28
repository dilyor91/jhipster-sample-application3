package uz.tashkec.service.dto;

import java.io.Serializable;
import java.util.Objects;
import uz.tashkec.domain.enumeration.InstitutType;

/**
 * A DTO for the {@link uz.tashkec.domain.Institution} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class InstitutionDTO implements Serializable {

    private Long id;

    private InstitutType institutionType;

    private String titleUz;

    private String titleRu;

    private String titleKr;

    private String contentUz;

    private String contentRu;

    private String contentKr;

    private String logoName;

    private String logoData;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public InstitutType getInstitutionType() {
        return institutionType;
    }

    public void setInstitutionType(InstitutType institutionType) {
        this.institutionType = institutionType;
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

    public String getLogoName() {
        return logoName;
    }

    public void setLogoName(String logoName) {
        this.logoName = logoName;
    }

    public String getLogoData() {
        return logoData;
    }

    public void setLogoData(String logoData) {
        this.logoData = logoData;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof InstitutionDTO)) {
            return false;
        }

        InstitutionDTO institutionDTO = (InstitutionDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, institutionDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "InstitutionDTO{" +
            "id=" + getId() +
            ", institutionType='" + getInstitutionType() + "'" +
            ", titleUz='" + getTitleUz() + "'" +
            ", titleRu='" + getTitleRu() + "'" +
            ", titleKr='" + getTitleKr() + "'" +
            ", contentUz='" + getContentUz() + "'" +
            ", contentRu='" + getContentRu() + "'" +
            ", contentKr='" + getContentKr() + "'" +
            ", logoName='" + getLogoName() + "'" +
            ", logoData='" + getLogoData() + "'" +
            "}";
    }
}
