package uz.tashkec.service.dto;

import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link uz.tashkec.domain.Owner} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class OwnerDTO implements Serializable {

    private Long id;

    private String name;

    private String family;

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

    public String getFamily() {
        return family;
    }

    public void setFamily(String family) {
        this.family = family;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof OwnerDTO)) {
            return false;
        }

        OwnerDTO ownerDTO = (OwnerDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, ownerDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "OwnerDTO{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", family='" + getFamily() + "'" +
            "}";
    }
}
