package uz.tashkec.web.rest;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.ResponseUtil;
import uz.tashkec.repository.KoreanCultureRepository;
import uz.tashkec.service.KoreanCultureService;
import uz.tashkec.service.dto.KoreanCultureDTO;
import uz.tashkec.web.rest.errors.BadRequestAlertException;

/**
 * REST controller for managing {@link uz.tashkec.domain.KoreanCulture}.
 */
@RestController
@RequestMapping("/api")
public class KoreanCultureResource {

    private final Logger log = LoggerFactory.getLogger(KoreanCultureResource.class);

    private static final String ENTITY_NAME = "koreanCulture";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final KoreanCultureService koreanCultureService;

    private final KoreanCultureRepository koreanCultureRepository;

    public KoreanCultureResource(KoreanCultureService koreanCultureService, KoreanCultureRepository koreanCultureRepository) {
        this.koreanCultureService = koreanCultureService;
        this.koreanCultureRepository = koreanCultureRepository;
    }

    /**
     * {@code POST  /korean-cultures} : Create a new koreanCulture.
     *
     * @param koreanCultureDTO the koreanCultureDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new koreanCultureDTO, or with status {@code 400 (Bad Request)} if the koreanCulture has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/korean-cultures")
    public ResponseEntity<KoreanCultureDTO> createKoreanCulture(@Valid @RequestBody KoreanCultureDTO koreanCultureDTO)
        throws URISyntaxException {
        log.debug("REST request to save KoreanCulture : {}", koreanCultureDTO);
        if (koreanCultureDTO.getId() != null) {
            throw new BadRequestAlertException("A new koreanCulture cannot already have an ID", ENTITY_NAME, "idexists");
        }
        KoreanCultureDTO result = koreanCultureService.save(koreanCultureDTO);
        return ResponseEntity
            .created(new URI("/api/korean-cultures/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /korean-cultures/:id} : Updates an existing koreanCulture.
     *
     * @param id the id of the koreanCultureDTO to save.
     * @param koreanCultureDTO the koreanCultureDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated koreanCultureDTO,
     * or with status {@code 400 (Bad Request)} if the koreanCultureDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the koreanCultureDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/korean-cultures/{id}")
    public ResponseEntity<KoreanCultureDTO> updateKoreanCulture(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody KoreanCultureDTO koreanCultureDTO
    ) throws URISyntaxException {
        log.debug("REST request to update KoreanCulture : {}, {}", id, koreanCultureDTO);
        if (koreanCultureDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, koreanCultureDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!koreanCultureRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        KoreanCultureDTO result = koreanCultureService.update(koreanCultureDTO);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, koreanCultureDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /korean-cultures/:id} : Partial updates given fields of an existing koreanCulture, field will ignore if it is null
     *
     * @param id the id of the koreanCultureDTO to save.
     * @param koreanCultureDTO the koreanCultureDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated koreanCultureDTO,
     * or with status {@code 400 (Bad Request)} if the koreanCultureDTO is not valid,
     * or with status {@code 404 (Not Found)} if the koreanCultureDTO is not found,
     * or with status {@code 500 (Internal Server Error)} if the koreanCultureDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/korean-cultures/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<KoreanCultureDTO> partialUpdateKoreanCulture(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody KoreanCultureDTO koreanCultureDTO
    ) throws URISyntaxException {
        log.debug("REST request to partial update KoreanCulture partially : {}, {}", id, koreanCultureDTO);
        if (koreanCultureDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, koreanCultureDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!koreanCultureRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<KoreanCultureDTO> result = koreanCultureService.partialUpdate(koreanCultureDTO);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, koreanCultureDTO.getId().toString())
        );
    }

    /**
     * {@code GET  /korean-cultures} : get all the koreanCultures.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of koreanCultures in body.
     */
    @GetMapping("/korean-cultures")
    public List<KoreanCultureDTO> getAllKoreanCultures() {
        log.debug("REST request to get all KoreanCultures");
        return koreanCultureService.findAll();
    }

    /**
     * {@code GET  /korean-cultures/:id} : get the "id" koreanCulture.
     *
     * @param id the id of the koreanCultureDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the koreanCultureDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/korean-cultures/{id}")
    public ResponseEntity<KoreanCultureDTO> getKoreanCulture(@PathVariable Long id) {
        log.debug("REST request to get KoreanCulture : {}", id);
        Optional<KoreanCultureDTO> koreanCultureDTO = koreanCultureService.findOne(id);
        return ResponseUtil.wrapOrNotFound(koreanCultureDTO);
    }

    /**
     * {@code DELETE  /korean-cultures/:id} : delete the "id" koreanCulture.
     *
     * @param id the id of the koreanCultureDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/korean-cultures/{id}")
    public ResponseEntity<Void> deleteKoreanCulture(@PathVariable Long id) {
        log.debug("REST request to delete KoreanCulture : {}", id);
        koreanCultureService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
