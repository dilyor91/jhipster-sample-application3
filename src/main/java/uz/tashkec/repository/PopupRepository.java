package uz.tashkec.repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;
import uz.tashkec.domain.Popup;

/**
 * Spring Data JPA repository for the Popup entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PopupRepository extends JpaRepository<Popup, Long> {}
