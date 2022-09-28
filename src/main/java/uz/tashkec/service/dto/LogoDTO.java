package uz.tashkec.service.dto;

import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link uz.tashkec.domain.Logo} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class LogoDTO implements Serializable {

    private Long id;

    private String name;

    private String logoData;

    private Boolean status;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLogoData() {
        return logoData;
    }

    public void setLogoData(String logoData) {
        this.logoData = logoData;
    }

    public Boolean getStatus() {
        return status;
    }

    public void setStatus(Boolean status) {
        this.status = status;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof LogoDTO)) {
            return false;
        }

        LogoDTO logoDTO = (LogoDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, logoDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "LogoDTO{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", logoData='" + getLogoData() + "'" +
            ", status='" + getStatus() + "'" +
            "}";
    }
}
